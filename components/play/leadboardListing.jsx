export default function LeadboardListing({ users }) {

    return (
        <div className="overflow-auto" id="friends-listing">
            {
                users.map((user, index) => {
                    return (
                        <div className="flex flex-row items-center">
                            <div className="grow-0 px-4">{index + 1}</div>
                            <div className="grow-0 rounded-full">
                                <img> /* TODO */</img>
                            </div>
                            <div className="grow">{user.username}</div>
                            <div className="grow-0">{user.exp}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}